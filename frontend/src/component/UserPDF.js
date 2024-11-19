import React, { useContext, useEffect } from 'react'
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import userContxet from '../context/UserContext';

const UserPDF = (props) => {
    const context = useContext(userContxet);
    const { fetchloginuser, loginuser } = context
    useEffect(() => {
        fetchloginuser()
    }, [])
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4',
            padding: 30,
        },
        header: {
            fontSize: 12,
            marginBottom: 10,
            textAlign: 'start',
            color: 'grey',
        },
        table: {
            display: 'table',
            width: '100%',
            borderStyle: 'solid',
            borderColor: '#000',
            borderWidth: 1,
            borderRadius: 5,
            overflow: 'hidden',
            marginTop: "20"
        },
        tableRow: {
            flexDirection: 'row',
            borderBottomWidth: 1,
        },
        tableCell: {
            width: '33%',
            padding: 2,
            borderRightWidth: 1,
            textAlign: 'center',
        },
        tableCellHeader: {
            fontWeight: 'bold',
        },
        tablecelltext: {
            fontSize: 14,
        },
        text: {
            margin: 5,
            fontSize: 14,
            textAlign: 'left',
            fontFamily: 'Times-Roman',
            letterSpacing:'2'
        },
        stamp: {
            marginTop: "100"
        },
        decor:{
            textDecoration:"underline"
        }
    });
    function calculateAge(birthDate) {
        const today = new Date(); // Current date
        const birthDateObj = new Date(birthDate); // Convert birth date string to Date object

        let age = today.getFullYear() - birthDateObj.getFullYear(); // Calculate the difference in years
        const monthDifference = today.getMonth() - birthDateObj.getMonth(); // Calculate month difference

        // Check if the birthday has occurred this year yet
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
            age--; // If the birthday hasn't occurred yet this year, subtract one year
        }

        return age;
    }
    function getTodayDate() {
        const today = new Date();
    
        const year = today.getFullYear();
    
        // Adding 1 to the month because getMonth() returns a 0-based value
        const month = String(today.getMonth() + 1).padStart(2, '0');
    
        // Getting the day of the month
        const day = String(today.getDate()).padStart(2, '0');
    
        // Format the date as YYYY-MM-DD
        const formattedDate = `${year}-${month}-${day}`;
    
        return formattedDate;
    }
    const MyDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <Text style={styles.header} fixed>
                        Mumbai Suburban Railway
                    </Text>
                    <Text style={styles.header}>School Certificate to be issued only to Students of not more than
                        25 years of age</Text>
                    <Text style={styles.text}>
                        I here by certify that <Text style={styles.decor}>{loginuser.name}</Text> regularly attends this School for the purpose
                        of receiving education , the institution of ehich I am Principle/Head Master and his/her
                        age this day , according to my belief and from enquiries I have made is <Text style={styles.decor}>{calculateAge(loginuser.dob.slice(0, 10))}</Text>years,his/her
                        date if birth as entered in the School Register being <Text style={styles.decor}>{loginuser.dob.slice(0, 10)}</Text>.He/She is therefore,entitled to the season
                        Ticket as detailed below at half the full rates charged for adults:-
                    </Text>
                    <View style={styles.table}>
                        {/* Table Header */}
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCell, styles.tableCellHeader]}>Class</Text>
                            <Text style={[styles.tableCell, styles.tableCellHeader]}>Period</Text>
                            <Text style={[styles.tableCell, styles.tableCellHeader]}>From</Text>
                            <Text style={[styles.tableCell, styles.tableCellHeader]}>To</Text>
                        </View>
                        {/* Table Rows */}
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCell, styles.tablecelltext]}>{props.Class}</Text>
                            <Text style={[styles.tableCell, styles.tablecelltext]}>{props.period}</Text>
                            <Text style={[styles.tableCell, styles.tablecelltext]}>{props.from}</Text>
                            <Text style={[styles.tableCell, styles.tablecelltext]}>{props.to}</Text>
                        </View>
                    </View>
                    <Text style={styles.text}>From {props.from} TO {props.to} for the quarter/month ending</Text>
                    <Text style={styles.text}>Date:-{getTodayDate()}</Text>
                    <Text style={[styles.text, styles.stamp]}>Name of College/School(Stamp of School/College)</Text>
                    <Text style={[styles.text, styles.stamp]}>Signature of Principle/Head Master</Text>
                    <Text  style={{width:"100%",border:"2px solid black"}}></Text>
                    <Text style={styles.text}>Note:</Text>
                    <Text style={styles.text}>1.Available only between station nearest to student's residence and station nearest to the school/college</Text>
                    <Text style={styles.text}>2.This column should be filled in by the station issuing the season ticket</Text>
                    <Text style={styles.text}>3.If no season ticket is held the word 'NIL' should be inserted </Text>
                    <Text style={styles.text}>4.This Certificate will be vaild for three day including the date of issue and if not made use of within that time must be returned by the issued for cancellation</Text>
                </View>
            </Page>
        </Document>
    );
    return (
        <div>
            <PDFDownloadLink document={<MyDocument />} fileName="concession.pdf" style={{color:"white"}}>
                {({ loading }) => ('Download PDF')}
            </PDFDownloadLink>
            <p className='fs-6 fw-lighter'>*Student has to take stamp and Signature from office to take concession*</p>
        </div>
    )
}

export default UserPDF
