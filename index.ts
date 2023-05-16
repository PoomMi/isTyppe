export type TypeConfig<T> = {
    key: keyof T,
    type: "number" | 'string' | 'object' | 'boolean',
    isOptional?: boolean
}

export function isType<T>(config: TypeConfig<T>[]) {
    const _config = config
    const _propCount = _config.length
    const keys = _config.map(x =>x.key as string)

    return (obj: any): boolean => {
        const objKeySize = Object.keys(obj).length
        if(
            ( objKeySize > _propCount) || 
            ( objKeySize < _config.filter(x=> x?.isOptional == undefined || !x?.isOptional).length )
        ) return false

        for(const k in obj) {
            const c = _config.find(x => x.key == k)

            if(
                (!obj[k] && (c?.isOptional == undefined || c.isOptional)) ||
                (obj[k] && typeof obj[k] != c?.type) ||
                (obj[k] && typeof obj[k] != c?.type) ||
                (!keys.includes(k))
            ) return false
        }

        return true
    }
}