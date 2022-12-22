import nodemailer from 'nodemailer'
import config from 'config'

const mail = config.get("mail");

const transporter = nodemailer.createTransport(mail);


export default transporter