import re

regex = re.compile(r'(\d+)-(\d+) ([a-z]): (.*)')

def parse_password_line(line):
    return regex.search(line.strip()).groups()
 
