from pathlib import Path

def test_patch():
    src = Path('src')
    print('checking..')
    for f in sorted(list(src.glob('**/*.ts'))):
        if f.is_file:
            if f.name == 'app.ts':
                # skip this file
                continue

            # all other files should be a quilt patch, so ensure they export a valid patch() func
            print(f'{f.name}', end=' ')
            contents = [line.strip() for line in f.open('r').readlines()]
            assert 'export const patch: Patch = function (buf) {' in contents
            print('→ OK')

    print('done!')
