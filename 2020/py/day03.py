lines = [line.strip() for line in open('day03.txt')]
_lines = ''.join(lines)
line_length = len(lines[0])

col = 0
for line in lines[1:]:
    next_col = col + 3
    if next_col > len(line):
        # next_col = 

'''
trees_count = 0
tree = '#'
for n, line in enumerate(lines[1:], start=1):
    checkin_idx = n * 3
    try: 
        checkin = line[checkin_idx]
        if checkin == tree:
            trees_count += 1
    except IndexError: 
        break
'''


print(trees_count)
