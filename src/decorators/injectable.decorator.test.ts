import * as injectable_decorator from "./injectable.decorator"
// @ponicode
describe("injectable_decorator.Injectable", () => {
    test("0", () => {
        let callFunction: any = () => {
            injectable_decorator.Injectable()
        }
    
        expect(callFunction).not.toThrow()
    })
})
