interface ErrorsContainer {
    errors?: Array<string>;
}

interface ChildrenContainer {
    children?: Children;
}

interface Children {
    [key: string]: ErrorsContainer & ChildrenContainer;
}

export interface FormErrors extends ErrorsContainer, ChildrenContainer {

}
