from fpdf import FPDF
import pandas as pd
from datetime import datetime
from typing import Dict, Any

class PDFReport(FPDF):
    def __init__(self):
        super().__init__()
        self.set_auto_page_break(auto=True, margin=15)
        self.set_title("Data Analysis Report")
        self.alias_nb_pages()  # For page numbering {nb}
    
    def header(self):
        # Logo or header image could be added here
        self.set_font('Arial', 'B', 16)
        self.set_text_color(0, 51, 102)  # Dark blue
        self.cell(0, 10, 'Data Analysis Report', 0, 1, 'C')
        self.set_font('Arial', '', 10)
        self.set_text_color(0, 0, 0)  # Black
        self.ln(5)
    
    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}/{{nb}}', 0, 0, 'C')
    
    def add_section_title(self, title: str, level: int = 1):
        """Add a section title with different levels"""
        if level == 1:
            self.set_font('Arial', 'B', 14)
            self.set_fill_color(240, 240, 240)  # Light gray background
            self.cell(0, 10, title, 0, 1, 'L', 1)
        elif level == 2:
            self.set_font('Arial', 'B', 12)
            self.cell(0, 8, title, 0, 1, 'L')
        else:
            self.set_font('Arial', 'B', 10)
            self.cell(0, 6, title, 0, 1, 'L')
        self.ln(2)
    
    def add_table(self, df: pd.DataFrame, col_widths=None):
        """Add a properly formatted table from a DataFrame"""
        self.set_font('Arial', '', 10)
        
        # Calculate column widths if not provided
        if col_widths is None:
            col_widths = [min(40, (self.w - 30) / len(df.columns))] * len(df.columns)
        
        # Header
        self.set_font('Arial', 'B', 10)
        self.set_fill_color(220, 220, 220)  # Light gray for header
        for i, col in enumerate(df.columns):
            self.cell(col_widths[i], 7, str(col), border=1, fill=True)
        self.ln()
        
        # Data
        self.set_font('Arial', '', 10)
        fill = False
        for _, row in df.iterrows():
            for i, col in enumerate(df.columns):
                self.cell(col_widths[i], 6, str(row[col]), border=1, fill=fill)
            self.ln()
            fill = not fill  # Alternate row colors
        
        self.ln(5)
    
    def add_text(self, text: str):
        """Add formatted multi-line text"""
        self.set_font('Arial', '', 10)
        self.multi_cell(0, 5, text)
        self.ln(3)
    
    def add_certificate(self):
        """Add a professional certificate page"""
        self.add_page()
        
        # Certificate border
        self.set_draw_color(0, 51, 102)
        self.set_line_width(1)
        self.rect(20, 20, self.w - 40, self.h - 40)
        
        # Certificate content
        self.set_y(50)
        self.set_font('Arial', 'B', 24)
        self.set_text_color(0, 51, 102)
        self.cell(0, 10, 'CERTIFICATE OF COMPLETION', 0, 1, 'C')
        
        self.ln(20)
        self.set_font('Arial', '', 14)
        self.set_text_color(0, 0, 0)
        self.multi_cell(0, 8, 'This is to certify that the internship project', 0, 'C')
        
        self.ln(5)
        self.set_font('Arial', 'B', 16)
        self.multi_cell(0, 8, '"Automated Report Generation System"', 0, 'C')
        
        self.ln(5)
        self.set_font('Arial', '', 14)
        self.multi_cell(0, 8, 'has been successfully completed.', 0, 'C')
        
        self.ln(20)
        self.set_font('Arial', 'I', 12)
        self.multi_cell(0, 8, 'Certificate will be issued on your internship end date.', 0, 'C')
        
        self.ln(30)
        self.set_font('Arial', 'B', 18)
        self.cell(0, 10, 'CodTech', 0, 1, 'C')
        
        # Signature line
        self.set_y(self.h - 60)
        self.set_draw_color(0, 0, 0)
        self.set_line_width(0.5)
        self.line(self.w / 2 - 30, self.h - 60, self.w / 2 + 30, self.h - 60)
        self.set_font('Arial', 'I', 10)
        self.cell(0, 10, 'Authorized Signature', 0, 0, 'C')

class ReportGenerator:
    @staticmethod
    def generate_report(analysis_results: Dict[str, Any], output_path: str = "report.pdf") -> str:
        """Generate a comprehensive PDF report from analysis results"""
        pdf = PDFReport()
        pdf.add_page()
        
        # Add report metadata
        pdf.add_section_title("Report Information", level=1)
        report_info = {
            "Generated on": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "Analysis performed by": "Automated Report Generation System",
            "Total records analyzed": len(analysis_results.get('data_overview', pd.DataFrame()))
        }
        
        info_text = "\n".join(f"{k}: {v}" for k, v in report_info.items())
        pdf.add_text(info_text)
        
        # Add analysis sections
        if 'data_overview' in analysis_results:
            pdf.add_section_title("Data Overview", level=1)
            pdf.add_table(analysis_results['data_overview'])
        
        if 'basic_stats' in analysis_results:
            pdf.add_section_title("Basic Statistics", level=1)
            pdf.add_table(analysis_results['basic_stats'])
        
        if 'missing_values' in analysis_results:
            pdf.add_section_title("Missing Values Analysis", level=1)
            pdf.add_table(analysis_results['missing_values'])
        
        # Add value counts if available
        value_count_keys = [k for k in analysis_results.keys() if k.startswith('value_counts_')]
        for key in value_count_keys:
            col_name = key.replace('value_counts_', '')
            pdf.add_section_title(f"Value Counts for '{col_name}'", level=1)
            pdf.add_table(analysis_results[key])
        
        if 'correlation_matrix' in analysis_results and not analysis_results['correlation_matrix'].empty:
            pdf.add_section_title("Correlation Matrix", level=1)
            pdf.add_table(analysis_results['correlation_matrix'])
        
        # Add certificate
        pdf.add_certificate()
        
        # Output the PDF
        pdf.output(output_path)
        return output_path