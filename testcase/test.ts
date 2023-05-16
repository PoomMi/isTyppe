import { isType, TypeConfig } from ".."
import { Contact, IDevice, IEmployee, IHuman } from "./model"

const Test = {
    failed: 0,
    success: 0,
    data: function (d: any) {
        return {
            equals: (c: any) => {
                const r = d === c
                Boolean(d === c) ? this.success++ : this.failed++
                return r ? '✔' : '❌'
            }
        }
    }
};


(() => {
    //#region human data
    const human1: IHuman = {
        name: "John",
        sex: "male",
        dateOfBirth: '2002-02-14'
    }

    const human2: any = {
        name: "John",
        sex: "male",
        dateOfBirth: new Date('2002-02-14'),
        address: 'USA'
    }

    const human3: any = {
        name: "John",
        sex: "male",
        dateOfBirth: '2002-02-14',
    }

    const human4: any = {
        name: "John",
        sex: "male",
        dateOfBirth: '2002-02-14',
        favColor: '#000000',
    }
    //#endregion

    //#region employee data
    const emp1: IEmployee = {
        name: "John",
        sex: "male",
        dateOfBirth: '2002-02-14',
        address: 'USA',
        eId: '123',
        position: 'HR'
    }

    const emp2: any = {
        name: "John",
        sex: "male",
        dateOfBirth: new Date('2002-02-14'),
        address: 'USA',
        eId: '123',
        position: 'HR'
    }

    const emp3: any = {
        name: "John",
        sex: "male",
        dateOfBirth: '2002-02-14',
        address: 'USA',
        eId: '123',
        position: 'HR'
    }

    const emp4: any = {
        name: "John",
        sex: "male",
        dateOfBirth: '2002-02-14',
        address: 'USA',
        eId: '123',
        position: 'HR',
        salary: 20000
    }
    const emp5: any = {
        name: "John",
        sex: "male",
        dateOfBirth: '2002-02-14',
        address: 'USA',
        eId: '123',
    }
    //#endregion

    //#region device data
    const device1: IDevice = {
        id: 'device1',
        model: 'ASD-001'
    }

    const device2: any = {
        id: 'device2',
    }

    const device3: any = {
        id: 'device2',
        model: 'ASD-002'
    }

    const device4: any = {
        id: 'device1',
        model: 'ASD-001',
        price: 534,
    }
    //#endregion

    //#region contact data
    const contact1: Contact = {
        name: 'John',
        type: 'phone',
        info: '1234567890'
    }

    const contact2: any = {
        name: 'John',
        info: '1234567890'
    }

    const contact3: any = {
        name: 'John',
        type: 'phone',
        info: '1234567890'
    }

    const contact4: any = {
        id: '123',
        name: 'John',
        type: 'phone',
        info: '1234567890'
    }
    //#endregion



    //#region human test
    const humanTypeConfig: TypeConfig<IHuman>[] = [
        { key: "name", type: "string" },
        { key: "sex", type: "string" },
        { key: "dateOfBirth", type: "string" },
        { key: "address", type: "string", isOptional: true },
    ]
    const isHumanType = isType<IHuman>(humanTypeConfig)
    console.log("Test: interface - Human")
    console.log("#1: should be true", Test.data(isHumanType(human1)).equals(true))
    console.log("#2: should be false => incorrect type of dateOfBirth", Test.data(isHumanType(human2)).equals(false))
    console.log("#3: should be true", Test.data(isHumanType(human3)).equals(true))
    console.log("#4: should be false => not includes (favColor)", Test.data(isHumanType(human4)).equals(false))
    console.log("----------------------------------------------------------------")
    //#endregion

    //#region employee test
    const employeeTypeConfig: TypeConfig<IEmployee>[] = [
        { key: "name", type: "string" },
        { key: "sex", type: "string" },
        { key: "dateOfBirth", type: "string" },
        { key: "address", type: "string" },
        { key: "eId", type: "string" },
        { key: "position", type: "string" },
    ]
    const isEmployeeType = isType<IEmployee>(employeeTypeConfig)
    console.log("Test: interface - Employee")
    console.log("#1: should be true", Test.data(isEmployeeType(emp1)).equals(true))
    console.log("#2: should be false => incorrect type of dateOfBirth", Test.data(isEmployeeType(emp2)).equals(false))
    console.log("#3: should be true", Test.data(isEmployeeType(emp3)).equals(true))
    console.log("#4: should be false => not includes (salary)", Test.data(isEmployeeType(emp4)).equals(false))
    console.log("#5: should be false => missing position", Test.data(isEmployeeType(emp5)).equals(false))
    console.log("----------------------------------------------------------------")
    //#endregion

    //#region device test
    const deviceTypeConfig: TypeConfig<IDevice>[] = [
        { key: "id", type: "string" },
        { key: "model", type: "string" },
    ]
    const isDeviceType = isType<IDevice>(deviceTypeConfig)
    console.log("Test: interface - Device")
    console.log("#1: should be true", Test.data(isDeviceType(device1)).equals(true))
    console.log("#2: should be false => missing model", Test.data(isDeviceType(device2)).equals(false))
    console.log("#3: should be true", Test.data(isDeviceType(device3)).equals(true))
    console.log("#4: should be false => not includes (price)", Test.data(isDeviceType(device4)).equals(false))
    console.log("----------------------------------------------------------------")
    //#endregion

    //#region contact test
    const contactTypeConfig: TypeConfig<Contact>[] = [
        { key: "name", type: "string" },
        { key: "type", type: "string" },
        { key: "info", type: "string" },
    ]
    const isContactType = isType<Contact>(contactTypeConfig)
    console.log("Test: type - Contact")
    console.log("#1: should be true", Test.data(isContactType(contact1)).equals(true))
    console.log("#2: should be false => missing type", Test.data(isContactType(contact2)).equals(false))
    console.log("#3: should be true", Test.data(isContactType(contact3)).equals(true))
    console.log("#4: should be false => not includes (name)", Test.data(isContactType(contact4)).equals(false))
    console.log("----------------------------------------------------------------")
    //#endregion
    
    console.log(`Test Result: success(${Test.success}), failed(${Test.failed})`)
})()