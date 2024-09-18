import { Select, MenuItem, Button } from '@mui/material'
import React, { useState } from 'react'
import { editProfile } from '../../../api/index.js'
import useStyles from './style.js'
import countries from 'i18n-iso-countries'
import enLocale from 'i18n-iso-countries/langs/en.json'
import { useEffect } from 'react'

const EditPopup = (props) => {
    const classes = useStyles()
    const username = localStorage.getItem('username')
    const [value, setValue] = useState(null)

    countries.registerLocale(enLocale)
    const countryObj = countries.getNames("en", {select: "official"})

    const countryArr = Object.entries(countryObj).map(([key, value]) => {
        return {
            label: value,
            value: value,
        }
    })


    const closeEditPage = () => {
        document.getElementById('editProfilePopup').style.display = 'none'
        document.getElementById('mainProfileContainer').style.overflow = 'auto'
    }

    const getAgeRange = () => {
        var arr = []
        for (let age = 13; age <= 99; age++) {
            arr.push(age)
        }
        
        return (arr.map(ele => {
                return (
                <MenuItem value={ele}>{ele} years old</MenuItem>
                )
            })
        );
    }

    const getCountryRange = () => {
        return (
            countryArr.map(({label, value}) => {
                return <MenuItem value={value}>{label}</MenuItem>
            })
        )
    }

    const handleChangeValue = (v) => {
        setValue(v)
    }

    const editSave = () => {
        editProfile({ type: props.type, value: value }, username).then((v) => {props.setNeedUpdate(val => (val + 1))})
        closeEditPage()
    }

    const editCancel = () => {
        closeEditPage()
    }

    useEffect(() => {
        const ele = document.getElementById('editProfilePopup')
        document.getElementById('mainProfileContainer').addEventListener('scroll', (ev) => {
            ele.style.top = `${ev.target.scrollTop}px` 
        })
    }, [])

    useEffect(() => {
        if (props.type === 'Status') {
            document.getElementById('statusTextArea').value = props.initial
        }
        if (props.type === 'AboutMe') {
            document.getElementById('aboutTextArea').value = props.initial
        }
        if (props.type === 'Age') {
            setValue(0)
        }
        if (props.type === 'Gender') {
            setValue('Others')
        }
        if (props.type === 'Location') {
            setValue('Unknown')
        }
    }, [props.type])


    return (
        <div className={classes.mainContainer} id='editProfilePopup'>
            <div className={classes.overlay}></div>
            {
                props.type === 'Age' ? 
                    <div className={classes.centered}>
                        <div className={classes.closeEdit} onClick={closeEditPage}>
                            <i className={`${classes.closeIcon} fas fa-times`}></i>
                        </div>
                        <div className={classes.header}>Age</div>
                        <div className={classes.selectDiv}>
                            <Select label={props.type} defaultValue={0} className={classes.select} 
                                    MenuProps={{ anchorOrigin: { vertical: 'bottom', horizontal: 'center' }, 
                                    transformOrigin: { vertical: 'top', horizontal: 'center' }, getContentAnchorEl: null, 
                                    classes: { paper: classes.menuPaper } }} onChange={(e) => {handleChangeValue(e.target.value)}}>
                                <MenuItem value={0} selected={true}>Unknown</MenuItem>
                                {
                                    getAgeRange()
                                }
                            </Select>
                        </div>
                        <div className={classes.buttonDiv}>
                            <Button className={classes.buttonSave} variant='contained' onClick={editSave}>Save</Button>
                            <Button className={classes.buttonCancel} variant='contained' onClick={editCancel}>Cancel</Button>
                        </div>
                    </div>
                : null
            }
            {
                props.type === 'Gender' ? 
                    <div className={classes.centered}>
                        <div className={classes.closeEdit} onClick={closeEditPage}>
                            <i className={`${classes.closeIcon} fas fa-times`}></i>
                        </div>
                        <div className={classes.closeEdit} onClick={closeEditPage}></div>
                        <div className={classes.header}>Gender</div>
                        <div className={classes.selectDiv}>
                        <Select label={props.type} defaultValue={'Others'} className={classes.select} 
                                    MenuProps={{ anchorOrigin: { vertical: 'bottom', horizontal: 'left' }, 
                                    transformOrigin: { vertical: 'top', horizontal: 'left' }, getContentAnchorEl: null, 
                                    classes: { paper: classes.menuPaper } }} onChange={(e) => {handleChangeValue(e.target.value)}}>
                                <MenuItem value={'Male'}>Male</MenuItem>
                                <MenuItem value={'Female'}>Female</MenuItem>
                                <MenuItem value={'Others'}>Others</MenuItem>
                            </Select>
                        </div>
                        <div className={classes.buttonDiv}>
                            <Button className={classes.buttonSave} variant='contained' onClick={editSave}>Save</Button>
                            <Button className={classes.buttonCancel} variant='contained' onClick={editCancel}>Cancel</Button>
                        </div>
                    </div>
                : null
            }
            {
                props.type === 'Location' ? 
                    <div className={classes.centered}>
                        <div className={classes.closeEdit} onClick={closeEditPage}>
                            <i className={`${classes.closeIcon} fas fa-times`}></i>
                        </div>
                        <div className={classes.closeEdit} onClick={closeEditPage}></div>
                        <div className={classes.header}>Location</div>
                        <div className={classes.selectDiv}>
                            <Select label={props.type} defaultValue={'Unknown'} className={classes.select} 
                                    MenuProps={{ anchorOrigin: { vertical: 'bottom', horizontal: 'left' }, 
                                    transformOrigin: { vertical: 'top', horizontal: 'left' }, getContentAnchorEl: null, 
                                    classes: { paper: classes.menuPaper } }} onChange={(e) => {handleChangeValue(e.target.value)}}>
                                <MenuItem value={'Unknown'} selected={true}>Unknown</MenuItem>
                                {
                                    getCountryRange()
                                }
                            </Select>
                        </div>
                        <div className={classes.buttonDiv}>
                            <Button className={classes.buttonSave} variant='contained' onClick={editSave}>Save</Button>
                            <Button className={classes.buttonCancel} variant='contained' onClick={editCancel}>Cancel</Button>
                        </div>
                    </div>
                : null
            }
            {
                props.type === 'Status' ?
                    <div className={classes.centered}>
                        <div className={classes.closeEdit} onClick={closeEditPage}>
                            <i className={`${classes.closeIcon} fas fa-times`}></i>
                        </div>
                        <div className={classes.closeEdit} onClick={closeEditPage}></div>
                        <div className={classes.header}>Status</div>
                        <div className={classes.statusEditDiv}>
                            <textarea id='statusTextArea' spellCheck={false} className={classes.statusInput} onChange={(e) => {handleChangeValue(e.target.value)}}></textarea>
                        </div>
                        <div className={classes.buttonDiv}>
                            <Button className={classes.buttonSave} variant='contained' onClick={editSave}>Save</Button>
                            <Button className={classes.buttonCancel} variant='contained' onClick={editCancel}>Cancel</Button>
                        </div>
                    </div>
                : null
            }
            {
                props.type === 'AboutMe' ?
                    <div className={classes.centered}>
                        <div className={classes.closeEdit} onClick={closeEditPage}>
                            <i className={`${classes.closeIcon} fas fa-times`}></i>
                        </div>
                        <div className={classes.closeEdit} onClick={closeEditPage}></div>
                        <div className={classes.header}>About Me</div>
                        <div className={classes.aboutEditDiv}>
                            <textarea id='aboutTextArea' spellCheck={false} className={classes.aboutInput} onChange={(e) => {handleChangeValue(e.target.value)}}></textarea>
                        </div>
                        <div className={classes.buttonDiv}>
                            <Button className={classes.buttonSave} variant='contained' onClick={editSave}>Save</Button>
                            <Button className={classes.buttonCancel} variant='contained' onClick={editCancel}>Cancel</Button>
                        </div>
                    </div>
                : null
            }
        </div>
    )
}

export default EditPopup
