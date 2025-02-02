from pathlib import Path

IGNORE = ['app', 'dot']
EXAMPLES = ['ex1', 'ex2', 'ex3', 'ex4', 'ex5', 'ex6']
BONUS = ['js1', 'js2', 'js3', 'js4']

def find_patches(path: Path) -> list[str]:
    out = []
    for f in sorted(list(path.glob('*.ts'))):
        if f.is_file:
            fn = f.name[:-3] # strip off .ts

            if fn in IGNORE + EXAMPLES + BONUS:
                # skip this file
                continue

            # all other files should be a quilt patch
            out.append(fn)

    if len(out) == 0:
        return EXAMPLES + BONUS
    elif len(out) <= 2:
        return out + ['dot']
    else:
        return out

def gen_patch_imports(patches: list[str]) -> list[str]:
    out = []
    for p in patches:
        out.append(f'import {{ patch as {p} }} from "./{p}";')
    return out

def gen_patch_objs(patches: list[str]) -> list[str]:
    out = []
    for p in patches:
        out.append(f'    {{ label: "{p}", patch: {p} }},')
    return out

def gen_new_contents(contents: list[str], patches: list[str]) -> list[str]:
    out = []
    skip = False
    for line in contents:
        if imports_start in line:
            skip = True
            out.append(line.rstrip())
            out.extend(gen_patch_imports(patches))
        elif imports_end in line:
            skip = False
        elif patches_start in line:
            skip = True
            out.append(line.rstrip())
            out.extend(gen_patch_objs(patches))
        elif patches_end in line:
            skip = False

        if not skip:
            out.append(line.rstrip())
    return out

if __name__ == '__main__':
    print('Patch')

    # config
    src = Path('src')
    app = src / 'app.ts'

    imports_start = '// imports - start'
    imports_end = '// imports - end'
    patches_start = '// patches - start'
    patches_end = '// patches - end'

    patches = find_patches(src)

    contents = app.open('r').readlines()
    new_contents = gen_new_contents(contents, patches)
    
    with app.open('w') as fp:
        fp.write('\n'.join(new_contents))
    
    print('done!')
