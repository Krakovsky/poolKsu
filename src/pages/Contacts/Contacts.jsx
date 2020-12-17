import React from 'react';
import { ReactSVG } from 'react-svg';

import './Contacts.scss';
import address from '../../media/address.svg';
import email from '../../media/email.svg';
import phone from '../../media/phone.svg';
import instagram from '../../media/instagram.svg';
import youtube from '../../media/youtube.svg';
import facebook from '../../media/facebook.svg';

const Contacts = () => (
    <div className="Contacts Page">
        <div className="Title">Контакти</div>
        <div className="Container">
            <div className="Contacts__wrap">
                <ReactSVG className="Contacts__icon" src={address} />
                вулиця Університетська, 27, Херсон, Херсонська область, 73000
            </div>
            <div className="Contacts__wrap">
                <ReactSVG className="Contacts__icon" src={phone} />
                +380 552 326784
            </div>
            <div className="Contacts__wrap">
                <ReactSVG className="Contacts__icon" src={email} />
                pool@ksu.ks.ua
            </div>
            <div>
                <div className="Contacts__container">
                    <a className="Contacts__link" href="https://www.facebook.com/KSUPool/" rel="noopener noreferrer" target="_blank">
                        <ReactSVG className="Contacts__icon" src={facebook} />
                    KSUPool
                </a>
                    <a className="Contacts__link" href="https://www.youtube.com/channel/UCE67KrR6NiksNLZk1gczkZQ" rel="noopener noreferrer" target="_blank">
                        <ReactSVG className="Contacts__icon" src={youtube} />
                    KSU
                </a>
                    <a className="Contacts__link" href="https://www.instagram.com/kherson_state_university/?igshid=3uea5havpfov" rel="noopener noreferrer" target="_blank">
                        <ReactSVG className="Contacts__icon" src={instagram} />
                    KSU
                </a>
                </div>
            </div>
            <div className="Contacts__map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1369.4812930862004!2d32.62884365827784!3d46.647253736088395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c41bc0e70a99eb%3A0x1ca98c892f64d386!2sPool%20KSU!5e0!3m2!1sru!2sua!4v1599765937542!5m2!1sru!2sua" width="90%" height="450" frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
            </div>
        </div>
    </div>
);

export default Contacts;
