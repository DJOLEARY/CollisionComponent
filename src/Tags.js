class Tags {

    objectTags = []
    ignoreTags = []

    constructor(objectTags, ignoreTags) {
        this.objectTags = objectTags
        this.ignoreTags = ignoreTags
    }

    hasObjectTag(tag) {
        return this.objectTags.includes(tag)
    }

    hasIgnoreTag(tag) {
        return this.ignoreTags.includes(tag)
    }

    canIgnoreObject(objectTags) {
        for (let i = 0; i < objectTags.length; i++) {
            const objectTag = objectTags[i];
            if (this.hasIgnoreTag(objectTag))
                return true
        }
        return false
    }
}