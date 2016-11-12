type ErrorsContainer = {
    errors?: string[];
}

type ChildrenContainer = {
    children?: Children;
}

type Children = {
    [key: string]: ErrorsContainer & ChildrenContainer;
}

export type FormErrors = ErrorsContainer & ChildrenContainer;