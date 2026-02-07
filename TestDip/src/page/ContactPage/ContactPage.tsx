import { useState } from 'react';
import Checkbox from '../../shared/ui/Checkbox/Checkbox';
import Text, { TextSizes } from '../../shared/ui/Text/Text';
import ContactMap from '../../components/Map/ContactMap';
import { addressOptions } from './modal/data';
import styles from './ContactPage.module.css';
import Feedback from '../../shared/ui/FeedbackBlock/Feedback';

export default function ContactPage() {
    const [selectedAddress, setSelectedAddress] = useState(
        'Санкт‑Петербург — Невский проспект, 96'
    );

    const spbAddresses = addressOptions.filter(addr => addr.includes('Санкт‑Петербург'));
    const mskAddresses = addressOptions.filter(addr => addr.includes('Москва'));

    return (
        <div className={styles.ContacPageContainer}>
            <Text className={styles.ContactPageTitle}>
                Контакты
            </Text>
            
            <div className={styles.MainContentContactPage}>
                <Text fontFamily='onest' size={TextSizes.XL2}>
                    Мы находимся в Санкт‑Петербурге и Москве — можно выбрать ближайшую площадку и удобный формат занятий.
                </Text>
                <Text fontFamily='onest' size={TextSizes.XL2}>
                    На этой странице собраны адреса филиалов, схема проезда и контакты для записи и уточнения расписания. 
                </Text>
                <Text fontFamily='onest' size={TextSizes.XL2}>
                    Если удобнее, напишите заранее — подскажем, как добраться, где припарковаться и что взять с собой на первое занятие.
                </Text>
            </div>

            <div className={styles.addressSelector}>
                <div className={styles.checkboxContainer}>
                    <div className={styles.checkboxColumn}>
                        {spbAddresses.map((address) => (
                            <Checkbox
                                key={address}
                                type="radio"
                                groupName="address-group"
                                label={address}
                                checked={selectedAddress === address}
                                onChange={(checked) => {
                                    if (checked) setSelectedAddress(address);
                                }}
                            />
                        ))}
                    </div>
                    
                    <div className={styles.checkboxColumn}>
                        {mskAddresses.map((address) => (
                            <Checkbox
                                key={address}
                                type="radio"
                                groupName="address-group"
                                label={address}
                                checked={selectedAddress === address}
                                onChange={(checked) => {
                                    if (checked) setSelectedAddress(address);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
            
            <ContactMap address={selectedAddress} />


            <div>
              <Feedback title='Можем ответить на все ваши вопросы' fullWidth={true}>
                Оставьте свои данные, мы свяжемся с вами и ответим на все ваши вопросы.
              </Feedback>
            </div>
        </div>
    );
}