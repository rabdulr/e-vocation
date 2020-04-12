class Users {
    constructor(firstName, lastName, address, city, state, zip, username, password){
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.username = username;
        this.password = password;
    }
};

class Companies {
    constructor(companyName, username, address, city, state, zip, industry, firstName, lastName, password){
        this.companyName = companyName;
        this.username = username;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.industry = industry;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }
};

class Posts {
    constructor(userId, title, description, industry, siteAddress, startDate, endDate, proposedBudget){
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.industry = industry;
        this.siteAddress = siteAddress;
        this.startDate = startDate;
        this.endDate = endDate;
        this.proposedBudget = proposedBudget;
    }
};

class Bids {
    constructor(postId, userId, companyId, proposal, bidStatus, bid){
        this.postId = postId
        this.userId = userId;
        this.companyId = companyId;
        this.proposal = proposal;
        this.bidStatus = bidStatus;
        this.bid = bid;
    }
};

class Contracts {
    constructor(userId, companyId, postId, contract, contractStatus){
        this.userId = userId;
        this.companyId = companyId;
        this.postId = postId;
        this.contract = contract;
        this.contractStatus = contractStatus
    }
};

class Ratings {
    constructor(id, idOfRated, rating, comments){
        this.id = id;
        this.idOfRated = idOfRated;
        this.rating = rating;
        this.comments = comments;
    }
};

class Comments {
    constructor(id, idOfPoster, comment){
        this.id = id;
        this.idOfPoster = idOfPoster;
        this.comment = comment;
    }
}

module.exports = {
    Users,
    Companies,
    Posts,
    Bids,
    Contracts,
    Ratings,
    Comments
}