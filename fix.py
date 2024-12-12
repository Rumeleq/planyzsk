import os
from bs4 import BeautifulSoup


def modify_script_tags(directory):
    """
    Modify script tags in HTML files to add type="module" if not already present.

    Args:
        directory (str): Path to the directory containing HTML files
    """
    # Counter for modified files
    modified_files_count = 0

    # Iterate through all files in the directory
    for filename in os.listdir(directory):
        if filename.endswith('.html'):
            filepath = os.path.join(directory, filename)

            # Read the HTML file
            with open(filepath, 'r', encoding='utf-8') as file:
                soup = BeautifulSoup(file, 'html.parser')

            # Flag to track if file was modified
            file_modified = False

            # Find all script tags
            for script in soup.find_all('script'):
                # Check if type attribute is missing or not set to module
                if not script.has_attr('type') or script['type'] != 'module':
                    script['type'] = 'module'
                    file_modified = True

            # If file was modified, write changes back
            if file_modified:
                with open(filepath, 'w', encoding='utf-8') as file:
                    file.write(str(soup))
                    modified_files_count += 1
                    print(f"Modified: {filename}")

    print(f"\nTotal files modified: {modified_files_count}")


def main():
    # Prompt user for directory path
    directory = "dane"
    modify_script_tags(directory)


if __name__ == "__main__":
    main()
