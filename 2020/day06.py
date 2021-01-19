import sys

if len(sys.argv) > 1:
    _input = sys.argv[1]
else:
    _input = 'day06.txt'

groups = open(_input).read().split('\n\n')
count =0
for group_answer in groups:
    group_answer = group_answer.replace('\n', '')
    yes_unique_answers = set(group_answer)
    count += len(yes_unique_answers)
print('yes answers count:', count)

count2= 0;
for group_answer in groups:
    answers = (set(answer) for answer in group_answer.splitlines())
    common = set.intersection(*answers)
    count2 += len(common)
print('common yess answers count :', count2)
