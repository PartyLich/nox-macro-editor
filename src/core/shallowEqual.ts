type signature = (
    a: Record<string, unknown>,
    b: Record<string, unknown>
) => boolean;

// shallow object comparison. true if `b` contains all the keys of `a` with
// matching values
const shallowEqual: signature = (a, b) => Object.keys(a).reduce(
    (acc: boolean, key: string) => acc && (a[key] === b[key]),
    true,
);

export default shallowEqual;
