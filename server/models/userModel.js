const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  fname: {
    type: String,
    required: [true, 'First name required'],
    validate: {
      validator() {
        if (this.fname.length < 3) {
          throw new Error('First name length must be greater than 2')
        }
        let patt = new RegExp(/\d/)
        if (patt.test(this.fname)) {
          throw new Error('First name must be contained with characther only')
        }
      }
    }
  },
  lname: {
    type: String,
    validate: {
      validator() {
        if (this.lname.length !== 0) {
          let patt = new RegExp(/\d/)
          if (patt.test(this.lname)) {
            throw new Error('Last name must be contained with characther only')
          }
          if (this.lname.length < 3) {
            throw new Error('Last name length must be greater than 2')
          }
        }
      }
    }
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true,
    validate: {
      validator() {
        let patt = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)
        if (!patt.test(this.email)) {
          throw new Error('Email is invalid')
        }
      }
    }
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    validate: {
      validator() {
        if (this.password.length < 6) {
          throw new Error('Password length must be greater than 5')
        }
        let patt = new RegExp(/[^a-zA-Z0-9]/)
        if (patt.test(this.password)) {
          throw new Error('Password is combination beetween number and char')
        }
        patt = new RegExp(/[a-zA-Z]/)
        if (patt.test(this.password)) {

          patt = new RegExp(/[0-9]/)
          if (!patt.test(this.password)) {
            throw new Error('Password is combination beetween number and char')
          }

        } else {
          throw new Error('Password is combination beetween number and char')
        }
      }
    }
  },
  avatar: {
    type: String,
    default: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
  },
  verified: {
    type: Number,
    default: 0
  },
  role: {
    type: String,
    default: 'user'
  }
});

userSchema.post('validate', doc => {
  doc.password = bcrypt.hashSync(doc.password, Number(process.env.PASS_HASH));
})

const User = mongoose.model('User', userSchema);

module.exports = User
