import React from "react";
import { FunctionFactory } from "survey-core";

export default function ResultEntry({ data }) {

    return (
        <div>
            <p>{data.name}: {data.eligible ? "Eligible" : "Not Eligible"}</p>
        </div>
    )
}