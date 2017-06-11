module.exports = {
  servers: {
    one: {
      host: '35.162.47.157',
      username: 'ubuntu',
      pem: '~/.ssh/acrostix2.pem'
      // password:
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'acrostix',
    path: './',
    servers: {
      one: {}
    },
    dockerImage: 'abernix/meteord:base',
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'http://35.162.47.157'
    },
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
