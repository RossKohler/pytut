import sys
try:
    total = sum(int(arg) for arg in sys.argv[1:])
    print(total)
except ValueError:
    print ('Please supply integer arguments')