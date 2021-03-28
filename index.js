"use strict";
const axios = require('axios');

global.l4logger = {
  key: null,
  env: "",
  init(key, env = "") {
    this.key = key;
    this.env = env;
    // console.log("key", this.key);
  },
  log(logType, message, data = {}) {
    data = {
      app_env: this.env,
      key: this.key,
      log_type: logType,
      message: message,
      // context  : new Error().stack,
      context: {},
      url: '',
      extra: data,
      created_at: Math.floor(Date.now() / 1000),
    };
    // console.trace(message);
    // console.log(new Error().stack);
    // console.log("key", this.key);
    this.apiCall(data);
    // fdb.collection("project_logs").doc("userId").collection('javascript')
    // .doc("project.id").collection("logs").add(data);
  },
  apiCall(data) {
    const baseURL = "https://us-central1-l4logger.cloudfunctions.net/l4logger";
    // baseURL = "http://localhost:3000";

    axios.post(baseURL + "/add", data)
      .then(function(response) {
        // console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });

  },
};