export const msGraphAPI = {
    Endpoint: "https://graph.microsoft.com",
    Version: "v1.0",
    BetaEndpoint: "https://graph.microsoft.com/beta",
};
export const clientIds = {
    //WebApp: "675fdfbc-296f-4a14-81fe-3dadc9b47b91", // Atedu
    //WebApi: "84ab99b0-34ab-4fc0-bbf9-8402f5790d8e",
    WebApp: "16153744-e45b-4845-a373-1a33a8cc2f60", // Dewise
    WebApi: "a9473bf8-3693-449b-aec3-c1cbe4834a80",
}
export const graphConfig = {
    Me: {
        Endpoint: "/me",
        Scopes: {
            GetUserDetails: ["User.Read", "MailboxSettings.Read", "MailboxSettings.ReadWrite"],
            SendMail: ["Mail.Send"],
            OneDrive: ["Files.ReadWrite"],
            GroupTeams: ["Team.ReadBasic.All"]
        }
    },
    MailFolder: {
        Endpoint: "/me/mailFolders",
        Scopes: {
            SearchFolder: ["Mail.Read"],
            ListFolders: ["Mail.Read"],
            CreateFolder: ["Mail.ReadWrite"],
            GetFolder: ["Mail.Read"],
            UpdateFolder: ["Mail.ReadWrite"],
            DeleteFolder: ["Mail.ReadWrite"],
            ListMessagesInFolder: ["Mail.Read"]
        }
    },
    Messages: {
        Endpoint: "/me/messages",
        Scopes: {
            ListMessages: ["Mail.Read"],
            CreateMessage: ["Mail.ReadWrite"],
            GetMessage: ["Mail.Read"],
            UpdateMessage: ["Mail.ReadWrite"],
            DeleteMessage: ["Mail.ReadWrite"],
            SendMessages: ["Mail.Send"],
            CreateReplyToMessage: ["Mail.ReadWrite"],
            ReplyToMessage: ["Mail.Send"],
            CreateReplyAllToMessage: ["Mail.ReadWrite"],
            ReplyAllToMessage: ["Mail.Send"],
            CreateForwardMessage: ["Mail.ReadWrite"],
            ForwardMessage: ["Mail.Send"],
            ListAttachments: ["Mail.Read"],
            AddAttachment: ["Mail.ReadWrite"],
            GetAttachment: ["Mail.Read"],
            DeleteAttachment: ["Mail.ReadWrite"],
            CreateMessageSessionToAttachLargeFile: ["Mail.ReadWrite"],
            MoveMessage: ["Mail.ReadWrite"],
        }
    },
    Events: {
        Endpoint: "/me/events",
        Scopes: {
            CreateEventSessionToAttachLargeFile: ["Calendars.ReadWrite"],
        }
    },
    Search: {
        Endpoint: "/search/query",
        Scopes: {
            QueryData: ["Mail.Read", "Calendars.Read", "Files.Read.All", "Sites.Read.All", "ExternalItem.Read.All"],
        }
    },
    People: {
        Endpoint: "/me/people",
        Scopes: {
            ListPeople: ["People.Read"],
            ListPeopleAll: ["People.Read.All"],
        }
    },
    Contacts: {
        Endpoint: "/me/contacts",
        Scopes: {
            ListContacts: ["Contacts.Read"],
        }
    },
    Categories: {
        Endpoint: "/me/outlook/masterCategories",
        Scopes: {
            ListCategories: ["MailboxSettings.Read"],
            CreateCategory: ["MailboxSettings.ReadWrite"],
            GetCategory: ["MailboxSettings.Read"],
            UpdateCategory: ["MailboxSettings.ReadWrite"],
            DeleteCategory: ["MailboxSettings.ReadWrite"],
        }
    },
    Batch: {
        Endpoint: "/$batch",
        Scopes: {
        }
    },
    Users: {
        Endpoint: "/users",
        Scopes: {
            ListUsers: ["User.ReadBasic.All"],
        }
    },
    OneDrive: {
        Endpoint: "/me/drive",
        Drives: "/me/drives",
        Groups: "/groups",
        Scopes: {
            ListFiles: ["Files.Read"]
        }
    },
    Teams: {
        Endpoint: "/teams",
        Scopes: {
            GetTeamPhoto: ["Team.ReadBasic.All"]
        }
    }
};
