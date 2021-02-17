import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles';


const styles = ((theme) => ({
    toolbar: theme.mixins.toolbar,
    })
)

const ExerciseList = (props) => {

    const { classes } = props
    const exercises = props.exercises

    return(
        <>
            <div className={classes.toolbar} />

            <div>
                {exercises.map((exercise) => (
                    <div>
                        {exercise.name}
                    </div>
                ))}
            </div>
        </>
    )
}

export default withStyles(styles)(ExerciseList)