from itertools import combinations

entries = [int(entry.strip()) for entry in open('day01.txt')]

for a,b in combinations(entries, 2):
    if a + b == 2020:
        print(a*b)
        break

for x,y,z in combinations(entries, 3):
    if x+y+z == 2020:
        print(x*y*z)
        break
