import { Injectable } from "@angular/core";

export class B2bConfig {
    public readonly authUri: string = "https://auth.snelstart.nl/b2b/token";
    public readonly apiBaseUriVersioned: string = "https://b2bapi.snelstart.nl/v1";
    public readonly subscriptionKey: string;
    public readonly koppelSleutel: string;

    constructor(subscriptionKey: string, koppelSleutel: string) {
        if (subscriptionKey == null) {
            throw new Error("subscriptionKey cannot be empty")
        }
        if (koppelSleutel == null) {
            throw new Error("koppelSleutel cannot be empty")
        }
        this.subscriptionKey = subscriptionKey;
        this.koppelSleutel = koppelSleutel;
    }
}