
const version = 1.0;

export const makeInstaller = (components: any) => {
    return {
        version,
        ...components
    }
}