declare global {
    module 'polka' {
        interface Request {
            foo: string;
        }
    }
}
