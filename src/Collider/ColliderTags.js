class ColliderTags {

    objectTags = [];
    ignoreTags = [];

    /**
     * @param {String[]} objectTags
     * @param {String[]} ignoreTags
     */
    constructor(objectTags, ignoreTags) {
        this.objectTags = objectTags
        this.ignoreTags = ignoreTags
    }

    hasObjectTag(tag) {
        return this.objectTags.indexOf(tag) > -1
    }

    hasIgnoreTag(tag) {
        return this.ignoreTags.indexOf(tag) > -1
    }
}