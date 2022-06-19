<?php

class modRemontProblemDuplicateProcessor extends modObjectDuplicateProcessor
{
    public $objectType = 'modRemontProblem';
    public $classKey = 'modRemontProblem';
    public $languageTopics = ['modremont'];
    public $nameField = 'pagetitle';


    public function beforeSave()
    {
        $this->newObject->set('uri',$this->getProperty('uri'));
        $this->newObject->set('active',(int)$this->getProperty('active'));
        return parent::beforeSave();
    }

}

return 'modRemontProblemDuplicateProcessor';