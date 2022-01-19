var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Student_gpa;
var Student = /** @class */ (function () {
    function Student(id, name, gpa) {
        _Student_gpa.set(this, void 0);
        this.id = id;
        this.name = name;
        __classPrivateFieldSet(this, _Student_gpa, gpa, "f");
    }
    Object.defineProperty(Student.prototype, "gpa", {
        get: function () { return __classPrivateFieldGet(this, _Student_gpa, "f"); },
        set: function (gpa) { __classPrivateFieldSet(this, _Student_gpa, gpa, "f"); },
        enumerable: false,
        configurable: true
    });
    ;
    ;
    Student.prototype.getName = function () { return this.name; };
    ;
    return Student;
}());
_Student_gpa = new WeakMap();
