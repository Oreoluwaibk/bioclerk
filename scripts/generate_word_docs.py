"""Generate BioClerk Word docs that mirror the printable HTML/PDF letterhead & invoice."""

from __future__ import annotations

from pathlib import Path

from docx import Document
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor, Twips
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
BRAND = PUBLIC / "brand"
LOGO_PNG = BRAND / "logo.png"

INK = RGBColor(0x14, 0x23, 0x1F)
MUTED = RGBColor(0x62, 0x73, 0x6E)
BRAND_DEEP = RGBColor(0x0E, 0x5C, 0x45)


def ensure_logo_png() -> Path:
    if LOGO_PNG.exists() and LOGO_PNG.stat().st_size > 1000:
        return LOGO_PNG

    size = 512
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((0, 0, 511, 511), radius=112, fill=(12, 51, 42, 255))
    d.rounded_rectangle((104, 104, 407, 407), radius=72, fill=(214, 245, 232, 255))
    d.rounded_rectangle((184, 196, 327, 243), radius=24, fill=(12, 71, 56, 255))
    d.rounded_rectangle((232, 148, 279, 291), radius=24, fill=(12, 71, 56, 255))
    for x, y, w, h in [
        (184, 326, 20, 30),
        (216, 308, 20, 66),
        (248, 318, 20, 46),
        (280, 296, 20, 90),
        (312, 324, 20, 34),
    ]:
        d.rounded_rectangle((x, y, x + w, y + h), radius=10, fill=(18, 128, 97, 255))
    d.ellipse((348, 104, 376, 132), fill=(97, 237, 176, 255))
    LOGO_PNG.parent.mkdir(parents=True, exist_ok=True)
    img.save(LOGO_PNG)
    return LOGO_PNG


def set_run(run, *, size=11, bold=False, color=INK):
    run.font.name = "Calibri"
    run._element.rPr.rFonts.set(qn("w:eastAsia"), "Calibri")
    run.font.size = Pt(size)
    run.bold = bold
    run.font.color.rgb = color


def spacing(p, *, before=0, after=0, line=1.15):
    pf = p.paragraph_format
    pf.space_before = Pt(before)
    pf.space_after = Pt(after)
    pf.line_spacing = line


def bottom_border(paragraph, color="102B26", sz="24"):
    pPr = paragraph._p.get_or_add_pPr()
    pBdr = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), sz)
    bottom.set(qn("w:space"), "8")
    bottom.set(qn("w:color"), color)
    pBdr.append(bottom)
    pPr.append(pBdr)


def remove_table_borders(table):
    tbl = table._tbl
    tblPr = tbl.tblPr if tbl.tblPr is not None else OxmlElement("w:tblPr")
    borders = OxmlElement("w:tblBorders")
    for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
        el = OxmlElement(f"w:{edge}")
        el.set(qn("w:val"), "nil")
        borders.append(el)
    tblPr.append(borders)
    if tbl.tblPr is None:
        tbl.insert(0, tblPr)


def set_cell_width(cell, cm: float):
    tcPr = cell._tc.get_or_add_tcPr()
    tcW = OxmlElement("w:tcW")
    tcW.set(qn("w:w"), str(int(cm * 567)))
    tcW.set(qn("w:type"), "dxa")
    tcPr.append(tcW)


def shade(cell, fill="E8F5EF"):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:fill"), fill)
    shd.set(qn("w:val"), "clear")
    tcPr.append(shd)


def cell_border(cell, color="DCE7E2"):
    tcPr = cell._tc.get_or_add_tcPr()
    tcBorders = OxmlElement("w:tcBorders")
    for edge in ("top", "left", "bottom", "right"):
        el = OxmlElement(f"w:{edge}")
        el.set(qn("w:val"), "single")
        el.set(qn("w:sz"), "4")
        el.set(qn("w:color"), color)
        tcBorders.append(el)
    tcPr.append(tcBorders)


def setup_a4(doc: Document):
    section = doc.sections[0]
    section.page_width = Cm(21.0)
    section.page_height = Cm(29.7)
    section.left_margin = Cm(1.6)
    section.right_margin = Cm(1.6)
    section.top_margin = Cm(1.8)
    section.bottom_margin = Cm(1.8)


def add_brand_header(doc: Document, logo: Path):
    """Match HTML header: logo + BioClerk/bioclerk.com | tagline."""
    table = doc.add_table(rows=1, cols=3)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    remove_table_borders(table)
    logo_cell, name_cell, tag_cell = table.rows[0].cells
    set_cell_width(logo_cell, 1.5)
    set_cell_width(name_cell, 6.5)
    set_cell_width(tag_cell, 9.8)

    p = logo_cell.paragraphs[0]
    spacing(p, before=0, after=0, line=1.0)
    p.add_run().add_picture(str(logo), width=Cm(1.2))

    p = name_cell.paragraphs[0]
    spacing(p, before=2, after=0, line=1.05)
    set_run(p.add_run("BioClerk"), size=22, bold=True, color=INK)
    p2 = name_cell.add_paragraph()
    spacing(p2, before=0, after=0, line=1.0)
    set_run(p2.add_run("BIOCLERK.COM"), size=11, color=MUTED)

    p = tag_cell.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    spacing(p, before=4, after=0, line=1.45)
    set_run(p.add_run("Offline clinical dictation"), size=12, color=MUTED)
    p2 = tag_cell.add_paragraph()
    p2.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    spacing(p2, before=0, after=0, line=1.45)
    set_run(
        p2.add_run("Medical transcription app for clinicians · Nigeria"),
        size=12,
        color=MUTED,
    )

    rule = doc.add_paragraph()
    spacing(rule, before=10, after=12, line=1.0)
    bottom_border(rule, color="102B26", sz="32")


def add_contact_footer_line(doc: Document):
    rule = doc.add_paragraph()
    spacing(rule, before=8, after=8, line=1.0)
    bottom_border(rule, color="102B26", sz="24")

    footer = doc.add_paragraph()
    spacing(footer, before=2, after=0, line=1.2)
    set_run(footer.add_run("contact us"), size=12, bold=True, color=INK)
    set_run(footer.add_run("  |  "), size=12, color=MUTED)
    set_run(footer.add_run("support.bioclerk@gmail.com"), size=12, color=MUTED)
    set_run(footer.add_run("  |  "), size=12, color=MUTED)
    set_run(footer.add_run("bioclerk.com"), size=12, color=MUTED)
    set_run(footer.add_run("  |  "), size=12, color=MUTED)
    set_run(footer.add_run("+234 904 295 6435"), size=12, color=MUTED)


def _clear_part(part):
    element = part._element
    for child in list(element):
        element.remove(child)


def build_letterhead(logo: Path) -> Path:
    """Letterhead in the page body (not Word header/footer) so it isn't dimmed."""
    doc = Document()
    setup_a4(doc)

    # Clear Word header/footer so nothing faint shows behind the page
    section = doc.sections[0]
    section.header.is_linked_to_previous = False
    section.footer.is_linked_to_previous = False
    _clear_part(section.header)
    _clear_part(section.footer)
    section.header.add_paragraph()
    section.footer.add_paragraph()

    add_brand_header(doc, logo)

    # Blank writing area (same idea as the HTML/PDF letterhead)
    for _ in range(20):
        p = doc.add_paragraph()
        spacing(p, before=0, after=0, line=1.5)

    add_contact_footer_line(doc)

    out = PUBLIC / "letterhead.docx"
    doc.save(out)
    return out


def build_invoice(logo: Path) -> Path:
    doc = Document()
    setup_a4(doc)
    add_brand_header(doc, logo)

    meta = doc.add_table(rows=1, cols=2)
    remove_table_borders(meta)
    bill, inv = meta.rows[0].cells
    set_cell_width(bill, 9.0)
    set_cell_width(inv, 8.8)

    p = bill.paragraphs[0]
    spacing(p, before=4, after=6, line=1.0)
    set_run(p.add_run("BILL TO"), size=10, bold=True, color=BRAND_DEEP)
    p = bill.add_paragraph()
    spacing(p, before=0, after=0, line=1.2)
    set_run(p.add_run("[Customer Name]"), size=15, bold=True, color=INK)
    p = bill.add_paragraph()
    spacing(p, before=0, after=0, line=1.2)
    set_run(p.add_run("[customer@email.com]"), size=12, color=MUTED)

    p = inv.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    spacing(p, before=4, after=6, line=1.0)
    set_run(p.add_run("INVOICE"), size=10, bold=True, color=BRAND_DEEP)

    details = inv.add_table(rows=3, cols=2)
    remove_table_borders(details)
    for i, (k, v) in enumerate(
        [
            ("Invoice #", "INV-2026-001"),
            ("Date", "27 October 2026"),
            ("Due date", "10 November 2026"),
        ]
    ):
        left, right = details.rows[i].cells
        lp = left.paragraphs[0]
        lp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        spacing(lp, before=0, after=2, line=1.15)
        set_run(lp.add_run(k), size=12, color=MUTED)
        rp = right.paragraphs[0]
        rp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        spacing(rp, before=0, after=2, line=1.15)
        set_run(rp.add_run(v), size=12, bold=True, color=INK)

    title = doc.add_paragraph()
    spacing(title, before=18, after=6, line=1.0)
    set_run(title.add_run("Invoice"), size=26, bold=True, color=INK)

    intro = doc.add_paragraph()
    spacing(intro, before=0, after=14, line=1.45)
    set_run(
        intro.add_run(
            "Thank you for choosing BioClerk. Please find the details of your license purchase below."
        ),
        size=12,
        color=MUTED,
    )

    items = doc.add_table(rows=2, cols=4)
    headers = ["DESCRIPTION", "QTY", "UNIT PRICE", "AMOUNT"]
    values = ["BioClerk desktop license", "1", "₦0.00", "₦0.00"]
    widths = [9.2, 2.2, 3.2, 3.2]
    for i, w in enumerate(widths):
        set_cell_width(items.rows[0].cells[i], w)
        set_cell_width(items.rows[1].cells[i], w)

    for i, text in enumerate(headers):
        cell = items.rows[0].cells[i]
        shade(cell, "E8F5EF")
        cell_border(cell)
        p = cell.paragraphs[0]
        if i:
            p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        spacing(p, before=4, after=4, line=1.0)
        set_run(p.add_run(text), size=10, bold=True, color=BRAND_DEEP)

    for i, text in enumerate(values):
        cell = items.rows[1].cells[i]
        cell_border(cell)
        p = cell.paragraphs[0]
        if i:
            p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        spacing(p, before=8, after=8, line=1.2)
        set_run(p.add_run(text), size=12, bold=(i == 0), color=INK)

    # Totals right-aligned block via 2-col table
    totals = doc.add_table(rows=3, cols=2)
    remove_table_borders(totals)
    totals.alignment = WD_TABLE_ALIGNMENT.RIGHT
    rows = [("Subtotal", "₦0.00"), ("Tax", "₦0.00"), ("Total", "₦0.00")]
    for i, (k, v) in enumerate(rows):
        left, right = totals.rows[i].cells
        set_cell_width(left, 3.2)
        set_cell_width(right, 3.2)
        lp = left.paragraphs[0]
        rp = right.paragraphs[0]
        lp.alignment = WD_ALIGN_PARAGRAPH.LEFT
        rp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        spacing(lp, before=4, after=4, line=1.2)
        spacing(rp, before=4, after=4, line=1.2)
        bold = i == 2
        color = INK if bold else MUTED
        size = 14 if bold else 12
        set_run(lp.add_run(k), size=size, bold=bold, color=color)
        set_run(rp.add_run(v), size=size, bold=bold, color=color)
        if i == 2:
            bottom_border(lp, color="102B26", sz="18")
            bottom_border(rp, color="102B26", sz="18")

    notes_label = doc.add_paragraph()
    spacing(notes_label, before=18, after=4, line=1.0)
    set_run(notes_label.add_run("PAYMENT NOTES"), size=10, bold=True, color=BRAND_DEEP)

    # Notes box as shaded single-cell table
    notes_box = doc.add_table(rows=1, cols=1)
    cell = notes_box.rows[0].cells[0]
    shade(cell, "E8F5EF")
    cell_border(cell, "DCE7E2")
    p = cell.paragraphs[0]
    spacing(p, before=6, after=6, line=1.4)
    set_run(
        p.add_run(
            "Payment instructions will be shared separately (bank transfer or Paystack). "
            "For questions about this invoice, email support.bioclerk@gmail.com."
        ),
        size=12,
        color=MUTED,
    )

    regards = doc.add_paragraph()
    spacing(regards, before=22, after=20, line=1.2)
    set_run(regards.add_run("Regards,"), size=12, color=INK)

    name = doc.add_paragraph()
    spacing(name, before=0, after=0, line=1.2)
    set_run(name.add_run("[Your Name]"), size=12, bold=True, color=INK)

    role = doc.add_paragraph()
    spacing(role, before=0, after=8, line=1.2)
    set_run(role.add_run("BioClerk"), size=12, color=MUTED)

    add_contact_footer_line(doc)

    out = PUBLIC / "invoice.docx"
    doc.save(out)
    return out


def main():
    logo = ensure_logo_png()
    letterhead = build_letterhead(logo)
    invoice = build_invoice(logo)
    print(f"Wrote {letterhead}")
    print(f"Wrote {invoice}")


if __name__ == "__main__":
    main()
