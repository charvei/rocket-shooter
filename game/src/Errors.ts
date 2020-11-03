let throwNotImplementedError = (): void => {
    throw {
        name: "NotImplementedError",
        message: "Function not implemented"
    }
}

export {
    throwNotImplementedError
}