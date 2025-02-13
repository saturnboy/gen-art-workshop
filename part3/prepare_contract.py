import json
import re
from pathlib import Path

# the CID of the jsons folder
IPFS_JSONS_CID = 'QmbCtH398mJZEHsGLhU8BQ73kqK1bcYt9anKtcUGQiS1Gz'

JSONS = Path('jsons') 
TEMPLATES = Path('templates')
TMPL_QUILT = TEMPLATES / 'quilt.sol'
QUILT = Path('contracts') / 'quilt.sol'

def extract_nums(paths: list[Path]) -> list[int]:
    patt = re.compile(r'.*?(\d+)$')
    nums = []
    for f in paths:
        m = patt.fullmatch(f.name)
        if m:
            n = int(m.group(1))
            nums.append(n)
    return sorted(nums)

if __name__ == '__main__':
    print('Prepare')

    # load images
    jsons = JSONS.glob('*')
    json_nums = extract_nums(jsons)
    N = len(json_nums)
    assert(N > 0)
    assert(json_nums[0] == 1)
    assert(json_nums[-1] == N)

    print(f'found 1..{N} jsons')

    # generate contract (from the template)
    print('gen quilt.sol..')
    with TMPL_QUILT.open('r') as fp:
        quilt = fp.read()

    quilt = quilt.replace('IPFS_JSONS_CID', IPFS_JSONS_CID).replace('999', f'{N}')

    with QUILT.open('w') as fp:
        fp.write(quilt)

    print("DONE")

