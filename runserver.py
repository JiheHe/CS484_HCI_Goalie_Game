#!/usr/bin/env python

from sys import argv, exit, stderr
import argparse
from app import app

def main():

    if len(argv) != 2:
        print('Usage: ' + argv[0] + ' port', file=stderr)
        exit(1)

    parser = argparse.ArgumentParser(
        description="A game for interactive display.")
    parser.add_argument(
        'port', metavar='port', type=str, nargs='?',
        help='the port at which the server should listen')
    args, _ = parser.parse_known_args()

    try:
        port = int(argv[1])
    except Exception:
        print('Port must be an integer.', file=stderr)
        exit(1)

    try:
        app.run(host='0.0.0.0', port=port, debug=True) # was 0.0.0.0
    except Exception as ex:
        print(ex, file=stderr)
        exit(1)

if __name__ == '__main__':
    main()
