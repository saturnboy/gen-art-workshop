import json
import re
from pathlib import Path

# the CID of the imgs folder
IPFS_IMGS_CID = 'QmVfRatBc8yDXrVX5ikDieNvFhpPN97wdWdbmLj2Evz46z'

IMGS = Path('imgs')
JSONS = Path('jsons') 
TEMPLATES = Path('templates')
TMPL_METADATA = TEMPLATES / 'metadata.json'

def extract_nums(paths: list[Path]) -> list[int]:
    patt = re.compile(r'.*?(\d+)\.png$')
    nums = []
    for f in paths:
        m = patt.fullmatch(f.name)
        if m:
            n = int(m.group(1))
            nums.append(n)
    return sorted(nums)

if __name__ == '__main__':
    print('Prepare')

    # validate images
    imgs = IMGS.glob('*.png')
    img_nums = extract_nums(imgs)
    N = len(img_nums)
    assert(N > 0)
    assert(img_nums[0] == 1)
    assert(img_nums[-1] == N)

    print(f'found 1..{N} images')

    # generate the metadata files (from the template)
    print('gen metadata..')
    for i in img_nums:
        print(f'{i}')
        j = TMPL_METADATA.open('r').read()
        j = j.replace('"Quilt N"', f'"Quilt {i}"')
        j = j.replace('IPFS_IMGS_CID', IPFS_IMGS_CID)
        j = j.replace('N.png', f'{i}.png')

        # save metadata (drop the .json extension!)
        dest = JSONS / f'{i}' 
        with dest.open('w') as fp:
            fp.write(j)

    print("DONE")

