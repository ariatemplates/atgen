/*
 * Copyright Amadeus
 */
/**
 * Interface exposed from the IO to the application. It is used by IO when using a transport.
 * @class aria.core.transport.ITransports
 */
Aria.interfaceDefinition({
  $classpath : 'aria.core.transport.ITransports',
  $interface : {
    /**
     * Initialization function.
     * @param {String} reqId request Id.
     */
    init : function (reqId) {},

    /**
     * Set up the parameters for a new connection and perform a request.
     * @param {String} reqId Request identifier
     * @param {String} method Request method, GET or POST
     * @param {String} uri Resource URI
     * @param {Object} callback Internal callback description
     * @param {String} postData Data to be sent in a POST request
     */
    request : function (reqId, method, uri, callback, postData) {}
  }
});