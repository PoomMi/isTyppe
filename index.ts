export type TypeConfig<T> = {
    key: keyof T,
    type: "number" | 'string' | 'object' | 'boolean',
    isOptional?: boolean
}

interface IConfigObjMap {
    [k: string]: {
        type: string
        required: boolean,
    }
}

export function isType<T>(config: TypeConfig<T>[]) {
    let _propCount = 0
    let _requiredPropCount = 0
    const configObjMap: IConfigObjMap = {}
    config.forEach(c => {
        _propCount++
        _requiredPropCount += (!c?.isOptional) ? 1 : 0
        configObjMap[c.key as string] = { type: c.type, required: !c?.isOptional }
    })

    return (obj: any): boolean => {
        let objKeySize = 0 
        for (const k in obj) {
            objKeySize++
            const _cObj = configObjMap[k]

            if (
                !_cObj ||
                (!obj[k] && _cObj.required) ||
                (obj[k] && typeof obj[k] != _cObj?.type)
            ) return false
        }

        return !((objKeySize > _propCount) || (objKeySize < _requiredPropCount))
    }
}