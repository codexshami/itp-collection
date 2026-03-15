from data_reader import DataReader
from data_analyzer import DataAnalyzer
from report_generator import ReportGenerator
import argparse
import logging
import sys

def setup_logging():
    """Configure logging for the application"""
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s',
        handlers=[
            logging.StreamHandler(sys.stdout)
        ]
    )

def main():
    setup_logging()
    
    # Set up argument parsing
    parser = argparse.ArgumentParser(
        description='Generate a PDF report from data file.',
        formatter_class=argparse.ArgumentDefaultsHelpFormatter
    )
    parser.add_argument(
        'file_path',
        help='Path to the input data file (CSV, JSON, or Excel)'
    )
    parser.add_argument(
        '-o', '--output',
        help='Output PDF file path',
        default='report.pdf'
    )
    parser.add_argument(
        '-v', '--verbose',
        help='Increase output verbosity',
        action='store_true'
    )
    
    args = parser.parse_args()
    
    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)
    
    try:
        # Read data
        logging.info(f"Reading data from {args.file_path}...")
        df = DataReader.read_file(args.file_path)
        logging.debug(f"Successfully read data with {len(df)} records")
        
        # Analyze data
        logging.info("Analyzing data...")
        analyzer = DataAnalyzer()
        analysis_results = analyzer.analyze_data(df)
        logging.debug("Data analysis completed")
        
        # Generate report
        logging.info(f"Generating report at {args.output}...")
        ReportGenerator.generate_report(analysis_results, args.output)
        logging.info("Report generated successfully!")
        
    except Exception as e:
        logging.error(f"Error: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()