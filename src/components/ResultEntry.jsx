import React from "react";
import { FunctionFactory } from "survey-core";

export default function ResultEntry({ data }) {

    return (
        <div>
            <p>{data.name}: {data.eligible ? "Eligible" : "Not Eligible"}</p>
            <ul>
                {data.data.map((result) => (
                    <li key={result.message}>
                        <p>{result.message} {data.eligible ? "Eligible" : data.eligible === null ? "Unknown" : "Not Eligible"}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}