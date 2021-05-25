import re

f = open('day04.txt').read()
required_fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', ]

valid_passports = 0
valid_passports_part2 = 0

passports = f.split('\n\n')

def within_range(num, start, end):
    try:
        num = int(num)
        return start <= num <= end
    except:
        return False

def validate_pattern(value, pattern):
    if re.search(pattern, value):
        return True
    return False

def validate_hgt(string):
    search = re.search('^(\d+)(cm|in)$', string)
    if search:
        num, unit = search.groups();
        return (unit == 'cm' and within_range(num, 150, 193)) or \
                (unit == 'in' and within_range(num, 59, 76))

schema = {
    'byr': (within_range, 1920, 2002),
    'iyr': (within_range, 2010, 2020),
    'eyr': (within_range, 2020, 2030),
    'hgt': (validate_hgt,),
    'hcl': (validate_pattern, r'^#[0-9a-f]{6}$'),
    'ecl': (lambda value: value in ('amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'),),
    'pid': (lambda value: len(value) == 9, )
}

for p in passports:
    passport = {}
    for key_value in p.split():
        key, value = key_value.split(':')
        passport[key] = value
    
    # part #1
    if all(field in passport for field in required_fields):
        valid_passports += 1

        # part #2
        isValid = True
        for (key, validator) in schema.items():
            func, *args = validator
            value = passport[key]
            isValid = isValid and func(value, *args)

        if isValid:
            valid_passports_part2+= 1

# part #2
print('valid passports:', valid_passports)
print('valid passports part #2:', valid_passports_part2)