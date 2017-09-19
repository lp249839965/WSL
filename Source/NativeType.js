/*
 * Copyright (C) 2017 Apple Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY APPLE INC. ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE INC. OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
 */
"use strict";

class NativeType extends Type {
    constructor(origin, name, isPrimitive, typeParameters)
    {
        super();
        this._origin = origin;
        this._name = name;
        this._isPrimitive = isPrimitive;
        this._typeParameters = typeParameters;
        this._isNumber = false;
        this._isInt = false;
        this._isFloating = false;
    }
    
    get origin() { return this._origin; }
    get name() { return this._name; }
    get isPrimitive() { return this._isPrimitive; }
    get typeParameters() { return this._typeParameters; }
    get isNative() { return true; }
    
    // We let Intrinsics.js set these as it likes.
    get isNumber() { return this._isNumber; }
    set isNumber(value) { this._isNumber = value; }
    get isInt() { return this._isInt; }
    set isInt(value) { this._isInt = value; }
    get isFloating() { return this._isFloating; }
    set isFloating(value) { this._isFloating = value; }
    
    instantiate(typeArguments)
    {
        if (typeArguments.length != this.typeParameters.length)
            throw new Error("Wrong number of type arguments to instantiation");
        if (!typeArguments.length)
            return this;
        return new NativeTypeInstance(this, typeArguments);
    }
    
    toString()
    {
        return "native " + (this.isPrimitive ? "Primitive " : "") + "type " + this.name + "<" + this.typeParameters + ">";
    }
}

