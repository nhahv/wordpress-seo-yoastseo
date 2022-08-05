export default Presenter;
declare class Presenter extends React.Component<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    isObject(obj: any): boolean;
    getScores(): any;
    addRating(item: any): {
        rating: any;
        text: any;
        identifier: any;
        score: any;
    };
}
import React from "react";
