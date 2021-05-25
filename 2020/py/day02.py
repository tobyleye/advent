import advent

valid_count1 = 0
valid_count2 = 0

with open('day02.txt') as f:
    for line in f:
        start, end, letter, password = advent.parse_password_line(line)
        start = int(start)
        end = int(end)

        letter_count = password.count(letter)
        if start <= letter_count <= end:
            valid_count1 += 1
        
        if (password[start-1] == letter) != (password[end-1] == letter):
            valid_count2 += 1
        
print('valid count 1:', valid_count1)
print('valid count 2:', valid_count2)

