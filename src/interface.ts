export interface CurrentUser {
    displayName: string,
    email: string,
    photoURL: string,
    uid: string,
    providerData: [{
        providerId: string
    }]
}

export interface Activities {
    creator: string,
    desciption: string,
    end: string,
    join: string[],
    location: string,
    start: string,
    time: string,
    title: string,
    topic: string
}

export interface Topics {
    activities: [{
        title: string
    }],
    following: [{
        userid: string
    }],
    topic: string
}