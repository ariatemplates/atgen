/*
 * Copyright Amadeus
 */
/**
 * Beans describing the message structure used in validators, in the error list widget, and returned in server side
 * validation.
 * @class aria.utils.validators.CfgBeans
 */
Aria.beanDefinitions({
	$package : "aria.utils.validators.CfgBeans",
	$description : "Beans used in validators and in the error widget.",
	$namespaces : {
		"json" : "aria.core.JsonTypes"
	},
	$beans : {
		"MessagesList" : {
			$type : "json:Array",
			$description : "List of messages.",
			$contentType : {
				$type : "Message"
			}
		},
		"Message" : {
			$type : "json:Object",
			$description : "Structure to store a message to be displayed to the user, with type, code, localized message, optional sub-messages...",
			$properties : {
				type : {
					$type : "json:String",
					$description : "Type of message, may be aria.utils.Data.TYPE_WARNING, aria.utils.Data.TYPE_ERROR or aria.utils.Data.TYPE_INFO. Other types are accepted as well.",
					$default : "E"
				},
				localizedMessage : {
					$type : "json:String",
					$mandatory : true,
					$description : "Message in user language."
				},
				code : {
					$type : "json:String",
					$mandatory : false,
					$description : "Language-independent error code."
				},
				fieldRef : {
					$type : "json:String",
					$mandatory : false,
					$description : "Path to a value in the data model which the message refers to."
				},
				metaDataRef : {
					$type : "json:ObjectRef",
					$mandatory : false,
					$description : "Reference to the meta-data structure of the value in the data model which the message refers to."
				},
				subMessages : {
					$type : "MessagesList",
					$mandatory : false,
					$description : "List of messages which describe in more details this message."
				}
			}
		}
	}
});
