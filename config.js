'use strict';

module.exports = require('rc')('papi', {
  name: 'Baby REST',
  versions: ['1.0.0'],
  port: 3000,
  redis: {
    port: 6379,
    host: '127.0.0.1',
    options: {}
  },
  mongo: {
    url: 'mongodb://127.0.0.1/papi'
  },
  oauth: {
    access_token_ttl: 86400
  },
  socket: {
    host: 'localhost',
    port: 8080,
    key: './keys/client-key.pem',
    cert: './keys/client-cert.pem',
    ca: ['./keys/server-cert.pem']
  },
  providers: {
    facebook: {
      clientID: 'XXXXXXXXXXXXXXX',
      clientSecret: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    }
  },
  mailgun: {
    apiKey: '',
    domain: '4yopping.com',
    templates: {
      reset: './build/emails/reset_password.html',
      confirmation: './build/emails/email_confirm.html',
      invite_friend: './build/emails/send_invite.html',
      friend_request: './build/emails/friend_request.html',
      event_invite: './build/emails/event_invite.html'
    }
  },
  mandrill: {
    apiKey: 'xxxxxxxxxxx',
    templates: {
      reset: 'Reset password',
      confirmation: 'Confirmation email',
      invite_friend: 'Invite friend',
      friend_request: 'Friend request'
    }
  },
  website: {
    host: 'http://54.172.72.141'
  },
  twilio: {
    accountSid: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    authToken: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    from: '+14506667788',
    confirmation_message: 'Codigo de confirmacion: {{ code }}',
    invite_message: '{{ user }} te ha invitado a descargar "Baby App" para que conozcas a su bebe. {{ url }}',
    event_invite_message: '{{ user }} te ha invitado a su evento de su bebé en "Baby App". {{ url }}'
  }
});
