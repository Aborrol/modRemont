<?php

class modRemontUrlGetListProcessor extends modObjectGetListProcessor
{
    public $objectType = 'modRemontUrl';
    public $classKey = 'modRemontUrl';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'DESC';
    //public $permission = 'list';


    /**
     * We do a special check of permissions
     * because our objects is not an instances of modAccessibleObject
     *
     * @return boolean|string
     */
    public function beforeQuery()
    {
        if (!$this->checkPermissions()) {
            return $this->modx->lexicon('access_denied');
        }

        return true;
    }


    /**
 * @param xPDOQuery $c
 *
 * @return xPDOQuery
 */
	public function prepareQueryBeforeCount(xPDOQuery $c)
	{
		$query = trim($this->getProperty('query'));
		$typequery = trim($this->getProperty('typequery'));

        // $c->leftJoin('msCategory', 'msCategory', 'msCategory.id = modRemontUrl.shopcategory');
        $c->select(array($this->modx->getSelectColumns('modRemontUrl', 'modRemontUrl')));
        // $c->select(array('msCategory.pagetitle as shopcategory_name'));

		if ($query) {

			$c->where([
				'pagetitle:LIKE' => "%{$query}%"
			]);
		}
		if ($typequery) {

			$c->where([
				'type' => $typequery
			]);
		}

		return $c;
	}


    /**
     * @param xPDOObject $object
     *
     * @return array
     */
    public function prepareRow(xPDOObject $object)
    {
		$array = $object->toArray();
		$array['actions'] = [];

		// Edit
		$array['actions'][] = [
			'cls' => '',
			'icon' => 'icon icon-eye',
			'title' => $this->modx->lexicon('modremont_url_open'),
			//'multiple' => $this->modx->lexicon('modremont_categories_update'),
			'action' => 'openUrl',
			'button' => true,
			'menu' => true,
		];

		if (!$array['active']) {
			$array['actions'][] = [
				'cls' => '',
				'icon' => 'icon icon-power-off action-green',
				'title' => $this->modx->lexicon('modremont_url_enable'),
				'multiple' => $this->modx->lexicon('modremont_categories_enable'),
				'action' => 'enableUrl',
				'button' => true,
				'menu' => true,
			];
		} else {
			$array['actions'][] = [
				'cls' => '',
				'icon' => 'icon icon-power-off action-gray',
				'title' => $this->modx->lexicon('modremont_url_disable'),
				'multiple' => $this->modx->lexicon('modremont_categories_disable'),
				'action' => 'disableUrl',
				'button' => true,
				'menu' => true,
			];
		}



		return $array;
    }

}

return 'modRemontUrlGetListProcessor';