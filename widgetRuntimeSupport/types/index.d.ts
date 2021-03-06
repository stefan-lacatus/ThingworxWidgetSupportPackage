
/// <reference path="../../types/index.d.ts" />

declare class TWEvent extends Function {
    private _isThingworxEvent: true;
}


type Filter<B, T> = {
    [Key in keyof B]:
        B[Key] extends T ? Key: never;
}

type CompatibleKeys<B, T> = Filter<B, T>[keyof B];

type ProtoOf<T> = Pick<T, keyof T>

/**
 * A class that represents a property aspect.
 */
declare class TWRuntimePropertyAspect {
    private static aspectWithKeyAndValue(key: string, value: any): TWRuntimePropertyAspect;

    private _key: string;

    private _value: any;
}

/**
 * Constructs and returns a property aspect that can be used to 
 * specify a method that can verify binding information before updating the property.
 * 
 * This must be the name of a method on the widget class that received the following parameters:
 * - **`value`**:     Represents the value that is about to be assigned to the property.
 * - **`info`**:      The complete `UpdatePropertyInfo` object.
 * 
 * The method must return a `boolean` that specify whether the binding update should occur or not.
 * @param {string} name         The name of the method that will handle this.
 * @return {TWPropertyAspect}   A property aspect.
 */
export function canBind(name: string): TWRuntimePropertyAspect;

/**
 * Constructs and returns a property aspect that can be used to 
 * specify a method that will be invoked after the property has been updated because of a binding.
 * Unlike the regular setter, this method will not be invoked when the property is assigned normally.
 * 
 * When this method is invoked, the new value will have been assigned to the property.
 * 
 * This must be the name of a method on the widget class that received the following parameters:
 * - **`previousValue`**:       Represents the property's previous value.
 * - **`info`**:                The complete `UpdatePropertyInfo` object.
 * 
 * The method is not expected to return any value.
 * @param {string} name         The name of the method that will handle this.
 * @return {TWPropertyAspect}   A property aspect.
 */
export function didBind(name: string): TWRuntimePropertyAspect;

/**
 * Returns a decorator that binds the class member it is applied to to a property definition.
 * 
 * @param {string} name                     If specified, this represents the name of the widget property to which this class member will be bound.
 *                                          If omitted, the name of the class member will be used instead.
 * 
 * @param {...TWPropertyAspect} args        An optional list of property aspects to apply to this property.
 * 
 * @return {any}                            A decorator.
 */
export function property(name: string, ...args: TWRuntimePropertyAspect[]): <T extends TWRuntimeWidget>(target: T, key: any, descriptor?: any) => void;

/**
 * Returns a decorator that binds the class member it is applied to to a property definition.
 * @param  {...TWRuntimePropertyAspect} args        An optional list of property aspects to apply to this property.
 * @return {any}                                    A decorator.
 */
export function property(...args: TWRuntimePropertyAspect[]): <T extends TWRuntimeWidget>(target: T, key: any, descriptor?: any) => void;

/**
 * Binds the class member it is applied to to the a property.
 */
export function property<T extends TWRuntimeWidget>(target: T, key: any, descriptor?: any): void;


/**
 * Returns a decorator that binds the property it is applied to to the service with the given name.
 * @param name      The name of the service to which this property will be bound.
 * @return          A decorator.
 */
export function service(name: string): (target: any, key: any, descriptor?: any) => void;

/**
 * A decorator that binds the given property to the service with the same name as the method.
 */
export function service(target: any, key: any, descriptor?: any): void;

/**
 * Returns a decorator that binds the property it is applied to to the event with the given name.
 * @param name      The name of the event to which this property will be bound.
 * @return          A decorator.
 */
export function event(name: string): <T extends TWRuntimeWidget, K extends keyof T, F extends T[K]>(target: T, key: CompatibleKeys<T, TWEvent>, descriptor?: TypedPropertyDescriptor<TWEvent>) => void;

/**
 * A decorator that marks the given property as an event.
 */
export function event<T extends TWRuntimeWidget, K extends keyof T, F extends T[K]>(target: T, key: CompatibleKeys<T, TWEvent>, descriptor?: TypedPropertyDescriptor<TWEvent>): void;

/**
 * Returns a decorator that makes a given widget class available to Thingworx.
 * @param name              The name of the widget.
 * @param args              An optional list of aspects to apply to the widget.
 * @return                  A decorator.
 */
export function TWWidgetDefinition<T extends new(...args: {}[]) => TWRuntimeWidget>(name: string): <T extends new(...args: {}[]) => TWRuntimeWidget>(widget: T) => void;

/**
* A decorator that makes a given widget class available to Thingworx.
* @param widget     The widget the decorator is applied to.
*/
export function TWWidgetDefinition<T extends new(...args: {}[]) => TWRuntimeWidget>(widget: T): void;

/**
 * Returns a decorator that binds the class member it is applied to to the given widget property.
 * When this decorator is used, `updateProperty` becomes optional.
 *
 * The class member to which this descriptor is applied should not have a getter. If it does, it will be replaced
 * by this decorator.
 */
export function TWProperty(name: any): (target: any, key: any, descriptor?: any) => void;

/**
 * Returns a decorator that binds the class method it is applied to to the given widget service.
 * When this decorator is used, `serviceInvoked` becomes optional.
 */
export function TWService(name: any): (target: any, key: any, descriptor: any) => void;

/**
 * @deprecated Use TWWidgetDefinition
 * 
 * Makes the given widget class available to Thingworx.
 * @param widget        The widget class to export.
 */
export function ThingworxRuntimeWidget(widget: any): void;

/**
 * @deprecated Use TWWidgetDefinition
 * 
 * Makes the given widget class available to Thingworx.
 * @param name          The name with which the widget will be exported.
 */
export function TWNamedRuntimeWidget(name: any): (widget: any) => void;
