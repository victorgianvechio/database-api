import randomstring from 'randomstring';

const options = {
  length: 128,
  charset:
    "qwertyuiopasdfghjklçzxcvbnmQWERTYUIOPASDFGHJKLÇZXCVBNM1234567890-_=+:!@#$%¨&*()\\|,<.>';/?~^]}´`[{",
};

const generateRandomString = () => {
  return randomstring.generate(options);
};

export default generateRandomString;
